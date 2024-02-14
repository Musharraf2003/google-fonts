

export type Font = {
    family: string
    variants: string[]
    subsets: string[]
    version: string
    lastModified: string
    files: {
        [key: string]: string
    },
    category: string,
    kind: string,
    menu: string
}

export interface FontWeight {
    value: number;
    family: string; 
}

export interface FontStyle {
    value: 'italic' | 'normal';
    family: string; 
}