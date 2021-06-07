export class XylonGridFilterConfig {

    logic:'or' | 'and';
    filters : XylonGridFilterDetailsConfig[] ;
    
}

export class XylonGridFilterDetailsConfig {

    field:string;
    operator:string ;
    value :string ;

} 