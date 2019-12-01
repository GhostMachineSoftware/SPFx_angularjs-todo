import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import 'ng-office-ui-fabric';
import './app/app.module';
export interface IToDoWebPartProps {
    todoListName: string;
    hideFinishedTasks: boolean;
}
export default class ToDoWebPart extends BaseClientSideWebPart<IToDoWebPartProps> {
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ToDoWebPart.d.ts.map