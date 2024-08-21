

const serializedObj = {
    name: "rabby",
    age: 23,
    geneder: "male"
}


console.log(JSON.stringify(serializedObj));

// The nonserialized attribute is a crucial Java feature that indicates when a field or method cannot be serialized

const nonSerializedObj = {
    name: "rabby",
    age: 23,
    geneder: "male",
    greet:()=>{
        return 'HELO WORLD';
    }
}


console.log(JSON.stringify(nonSerializedObj));