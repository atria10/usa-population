export interface State {
    "ID State": string;
    State: string;
    "ID Year": number;
    Year: string;
    Population: number;
    "Slug State": string;
}

export interface Annotations {
    source_name: string;
    source_description: string;
    dataset_name: string;
    dataset_link: string;
    table_id: string;
    topic: string;
    subtopic: string;
}

export interface Source {
    measures: string[];
    annotations: Annotations;
    name: string;
    substitutions: any[];
}

export interface ResponseStates {
    data: State[];
    source: Source[];
}