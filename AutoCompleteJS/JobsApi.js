


var ac = new AutoComplete("#input");

var searchParameters = ac.getValue();


var OR_1 = [
    [{value: {id: 1, name: "skill"}},{value: {id: 123, name: "C#"}}],
    [{value: {id: 2, name: "keyword"}},{value: ""}],
    [{value: {id: 1, name: "skill"}},{value: {id: 456, name: "java"}}],
    [{value: {id: 3, name: "yearsExperience"}},{value: {type: "min", value: 2}},{value: {type: "max", value: 6}}],
];

var OR_2 = [
    [{value: {id: 1, name: "skill"}},{value: {id: 123, name: "C#"}}],
    [{value: {id: 2, name: "keyword"}},{value: ""}],
    [{value: {id: 1, name: "skill"}},{value: {id: 456, name: "java"}}],
    [{value: {id: 3, name: "yearsExperience"}},{value: {type: "min", value: 2}},{value: {type: "max", value: 6}}],
];

var OR_3 = [
    [{value: {id: 1, name: "skill"}},{value: {id: 123, name: "C#"}}],
    [{value: {id: 2, name: "keyword"}},{value: ""}],
    [{value: {id: 1, name: "skill"}},{value: {id: 456, name: "java"}}],
    [{value: {id: 3, name: "yearsExperience"}},{value: {type: "min", value: 2}},{value: {type: "max", value: 6}}],
];

var search = [
    OR_1,
    OR_2,
    OR_3
];


