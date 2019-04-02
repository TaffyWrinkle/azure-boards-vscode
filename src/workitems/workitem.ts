import {
  WorkItem,
  WorkItemType
} from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";

export class WorkItemTypeIcon {
  public readonly type: string = "";
  public readonly icon: string = "";
  public readonly url: string = "";

  constructor(workItemType: WorkItemType) {
    this.type = workItemType.name ? workItemType.name : "";
    this.icon =
      workItemType.icon && workItemType.icon.id ? workItemType.icon.id : "";
    this.url =
      workItemType.icon && workItemType.icon.url ? workItemType.icon.url : "";
  }
}

export class WorkItemComposite {
  public readonly workItemType: string = "";
  public readonly workItemId: number = -1;
  public readonly workItemTitle: string = "";
  public readonly workItemUrl: string = "";

  constructor(workItem: WorkItem, workItemTypeIcons: WorkItemTypeIcon[]) {
    this.workItemType = workItem.fields
      ? workItem.fields["System.WorkItemType"]
      : "";
    this.workItemId = workItem.fields ? workItem.fields["System.Id"] : -1;
    this.workItemTitle = workItem.fields ? workItem.fields["System.Title"] : "";

    //get index of icon from list of avaible icons for the work item type
    //seems like there should be a better way of doing this?
    let i = workItemTypeIcons.findIndex(x => x.type === this.workItemType);

    this.workItemUrl = workItemTypeIcons[i].url.toString();
  }
}
