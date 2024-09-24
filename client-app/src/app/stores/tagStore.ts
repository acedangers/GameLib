import { makeAutoObservable, runInAction } from "mobx";
import { Tag } from "../models/tag";
import agent from "../api/agent";

export default class TagStore {
  tagRegistry = new Map<string, Tag>();
  selectedTag: Tag | undefined = undefined;

  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  private setTag = (tag: Tag) => {
    this.tagRegistry.set(tag.id, tag);
  };

  get tagsByName() {
    const tags = Array.from(this.tagRegistry.values()).sort(
      (a, b) => b.gameIds.length - a.gameIds.length
    );
    return tags;
  }

  get groupedTags() {
    return Object.entries(
      this.tagsByName.reduce((tags, tag) => {
        const name = tag.name;
        tags[name] = tags[name] ? [...tags[name], tag] : [tag];
        return tags;
      }, {} as { [key: string]: Tag[] })
    );
  }

  loadTags = async () => {
    this.setLoadingInitial(true);
    try {
      const tags = await agent.Tags.list();
      tags.forEach((tag) => {
        this.setTag(tag);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  private getTag = (id: string) => {
    return this.tagRegistry.get(id);
  };

  loadTag = async (id: string) => {
    let tag = this.getTag(id);

    if (tag) {
      console.log(
        `Setting tag from cache: ${tag.name}, ${tag.gameIds.map(
          (t) => " " + t
        )}`
      );

      runInAction(() => {
        this.selectedTag = tag; // Use cached tag if complete
      });

      return tag;
    } else {
      console.log(`Setting tag from api.`);

      this.setLoadingInitial(true);
      try {
        tag = await agent.Tags.details(id);

        runInAction(() => {
          this.setTag(tag!); // Cache the new tag
          this.selectedTag = tag; // Set the newly fetched tag
        });
        this.setLoadingInitial(false); // Done loading
        return tag;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };
}
