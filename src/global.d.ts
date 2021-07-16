/// <reference types="@sveltejs/kit" />

declare interface PostCompact {
    postUrl: string;
    imageUrl: string;
    title: string;
    location: string;
    time: string;
    formatedTime: string;
    slug: string;
}

declare interface PostDetails {
    title: { rendered: string };
    content: { rendered: string };
    author: number;
    cpa_author: string;
    date: string;
}
