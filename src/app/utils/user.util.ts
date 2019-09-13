export class UserUtil {

    static get(): any {
        const data = localStorage.getItem('agenda.user');
        if (!data) return null
        return JSON.parse(data);
    }

    static set(data): any {
        localStorage.setItem('agenda.user', JSON.stringify(data));
    }

    static clear(): any {
        localStorage.removeItem('agenda.user');
    }
}