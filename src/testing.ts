import { matchObject, matchArray, setDefaults, resetDefaults } from "../src/searchts";
let data;
data = [
    {
        name: "Alice",
        fullname: "I am Alice Shiller",
        age: 25,
        birthday: new Date(1992, 1, 28),
        email: "alice@searchts.com",
        city: { Montreal: "first", Toronto: "second" },
        other: { personal: { birthPlace: "Vancouver" }, emptyArray2: [] },
        emptyArray1: [],
    },
    { name: "Brian", age: 30, birthday: new Date(1987, 10, 16), email: "brian@searchts.com", male: true, empty: "hello" },
    { name: "Carrie", age: 30, birthday: new Date(1987, 5, 9), email: "carrie@searchts.com", city: { Montreal: true, "New York": false } },
    {
        name: "David",
        age: 35,
        birthday: new Date(1982, 9, 17),
        email: "david@searchts.com",
        male: true,
        personal: {
            cars: [
                { brand: "Porsche", build: 2016 },
                { brand: "BMW", build: 2014 },
            ],
        },
    },
    {
        name: "Alice",
        age: 30,
        birthday: new Date(1987, 6, 10),
        email: ["alice@searchts.com", "alice@gmail.com"],
        cars: [
            { automatic: true, manual: false, brand: "BMW", build: 2015, cds: [{ title: "Best Of 2015" }, { title: "Best Of 2016" }] },
            { brand: "Porsche", build: 2013 },
        ],
    },
    { name: "Other", id: 3, currentC: { cer: { id: 2 } } },
    { name: "John", level1: { level2: { level3: { level4: { level5: { level6: 200 } } } } } },
];


export const testing = () => {
    const x = { data: data };
    const res = matchArray(data, { name: "alice", _not: true })
   const u = matchObject(x, { name: "alice", _not: true })
    console.log(u);
}

testing();