export class MenuItem {
    private id: number;
    private name: string;
    private icon: string;
    private url: string;
    private status: boolean;
    private access: boolean;
    private subMenu: any;
    constructor($id: number, $name: string, $icon: string, $url: string, $status: boolean, $access: boolean, $subMenu: any) {
        this.id = $id;
        this.name = $name;
        this.icon = $icon;
        this.url = $url;
        this.status = $status;
        this.access = $access;
        this.subMenu = $subMenu;
    }

}
