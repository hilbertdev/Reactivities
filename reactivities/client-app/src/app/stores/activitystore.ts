import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity } from "../layout/models/Activity";

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    hasSubmitted = true;
    loadingInitial = false;
    constructor() {
        makeAutoObservable(this);
    }

    get activitesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a,b) => a.date!.getTime() - b.date!.getTime());
    }
    get groupedActivity() {
        return Object.entries(
            this.activitesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]
                return activities;
            }, {} as {[key:string]: Activity[]})
        )
    }
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
    loadActivity = async (id: string) => {
      let activity = this.getActivity(id);
      if (activity) {
          this.selectedActivity = activity;
          return activity;
      }
      else {
          this.loadingInitial = true;
          try {
            activity = await agent.Activities.details(id);
            this.setActivity(activity);
            runInAction(() => {
                this.selectedActivity = activity;
                this.setLoadingInitial(false);
            });
            return activity;
          } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
          }
      }
    }
    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }
    loadAcitvities = async () => {
        this.loadingInitial = true;
        try {
           const activities = await agent.Activities.list();
           activities.forEach(activity => {
            this.setActivity(activity)
              })
           runInAction(() => {
            this.setLoadingInitial(false);
           })
        } catch (error) {
            console.log(error)
            runInAction(() => {
        
               })
        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    createActivity = async (activity: Activity) => {
         this.loading = true;
         try {
             await agent.Activities.create(activity);
             runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
             })
         } catch(error) {
             console.log(error);
             runInAction(() => {
                 this.loading = false;
             })
         }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
               this.activityRegistry.set(activity.id, activity);
               this.selectedActivity = activity;
               this.editMode = false;
               this.loading = false;
            })
        }
        catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
           await agent.Activities.delete(id);
           runInAction(() => {
               this.activityRegistry.delete(id);
               this.loading = false;
           })
        } catch(error) {
           runInAction(() => {
               this.loading = false;
           })
        }
    }

}