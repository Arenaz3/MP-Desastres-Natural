export class Disaster {
    id: string;
    title: string;
    location: string;
    date: string;
    description: string;
    active: boolean;

    constructor(id: string, title: string, location: string, date: string, description: string, active: boolean) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.date = date;
        this.description = description;
        this.active = active;
    }
}