export class ContactUtil {

    static get(): any {
        const data = localStorage.getItem('agenda.contact');
        if (!data) return null
        return JSON.parse(data);
    }

    static set(data): any {
        localStorage.setItem('agenda.contact', JSON.stringify(data));
    }

    static clear(): any {
        localStorage.removeItem('agenda.contact');
    }
}