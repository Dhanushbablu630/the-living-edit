import { serviceMedia } from "./site-media";

export const editorialMedia = serviceMedia;
export function mediaFor(slug: string) { return editorialMedia[slug] ?? serviceMedia["residential-interiors"]; }
