import { makeObservable, observable, action, runInAction } from "mobx";
import agent from "../api/agent";
import { IProfile } from "../models/profile";
import { RootStore } from "./rootStore";

export default class ProfileStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile = true;

    @action loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
            })
        } catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => {
                this.loadingProfile = false;
            })
        }
    }
}