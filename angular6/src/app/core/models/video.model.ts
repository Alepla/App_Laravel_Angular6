export interface Video {
    id: string,
    slug: string;
    title: string;
    description: string;
    link: string;
    like: boolean;
    dislike: boolean;
    subscribe: boolean;
    video: string;
    thumbnail: string;
    state: string;
    category: string;
    views: number;
    createdAt: string;
    updatedAt: string;
    time: string;
    creator:any;
}
