
export interface User {
    id: string;
    email: string;
    password: string;

}
export interface HabitInput {
    title: string;
    description?: string;
    frequency: string;
    startDate: Date;
    userId: string;
    user: User;
}