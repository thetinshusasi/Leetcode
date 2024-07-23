// // [
// //     {
// //         "id": "50ff1866-90c8-42ea-a97f-64ab54d747b2",
// //         "type": "page",
// //         "sequence": 0,
// //         "children":
// //         [
// //             "4ad47d59-e878-4a7e-b9ba-d007ac5a6bfe"
// //         ]
// //     },
// //     {
// //         "id": "4ad47d59-e878-4a7e-b9ba-d007ac5a6bfe",
// //         "type": "line",
// //         "sequence": 0,
// //         "children":
// //         [
// //             "abacef3e-9c25-4a88-83ee-95b5c27ad3dd",
// //             "2cf6122d-f46f-4b70-96f4-e70e9b03d113"
// //         ]
// //     },
// //     {
// //         "id": "abacef3e-9c25-4a88-83ee-95b5c27ad3dd",
// //         "type": "word",
// //         "sequence": 0,
// //         "text": "Hello",
// //         "geometry":
// //         {
// //             "x0": 0.0124,
// //             "x1": 0.0571,
// //             "y0": 0.0513,
// //             "y1": 0.1548
// //         }
// //     },
// //     {
// //         "id": "2cf6122d-f46f-4b70-96f4-e70e9b03d113",
// //         "type": "word",
// //         "sequence": 1,
// //         "text": "world!",
// //         "geometry":
// //         {
// //             "x0": 0.0958,
// //             "x1": 0.2545,
// //             "y0": 0.0495,
// //             "y1": 0.1627
// //         }
// //     }
// // ]



// const getPageChildren = (ocrJson: string, page_num: number) => {

//     let page_children = []
//     let page_json: any[] = JSON.parse(ocrJson)

//     const children = page_json.find(item => item.type == "page" && item.sequence === page_num)?.children || []

//     return children;

// }


// const getPageText = (ocrJson: string, page_num: number): string => {
//     {
//         "50ff1866-90c8-42ea-a97f-64ab54d747b2":
//     }


//     let pageJson: any[] = JSON.parse(ocrJson)
//     const pageChildren = getPageChildren(ocrJson, page_num)

//     if (pageChildren.length == 0) {
//         return ""
//     }

//     let text = ""

//     for (let id of pageChildren) {
//         let lines = pageJson.filter(item => item.id === id)
//         lines.sort((a, b) => a.sequence - b.sequence)
//         for (let lineId of lines) {
//             const wordChildren = lineId.children
//             let wordsArr = pageJson.filter(item => wordChildren.includes(item.id))
//             wordsArr.sort((a, b) => a.sequence - b.sequence)

//             for (let word of wordsArr) {
//                 text += word.text + " "

//             }

//             text += "\n"

//         }


//     }

//     return text;


// }

// const ocrJson = `[
//     {
//         "id": "50ff1866-90c8-42ea-a97f-64ab54d747b2",
//         "type": "page",
//         "sequence": 0,
//         "children":
//         [
//             "4ad47d59-e878-4a7e-b9ba-d007ac5a6bfe"
//         ]
//     },
//     {
//         "id": "4ad47d59-e878-4a7e-b9ba-d007ac5a6bfe",
//         "type": "line",
//         "sequence": 0,
//         "children":
//         [
//             "abacef3e-9c25-4a88-83ee-95b5c27ad3dd",
//             "2cf6122d-f46f-4b70-96f4-e70e9b03d113"
//         ]
//     },
//     {
//         "id": "abacef3e-9c25-4a88-83ee-95b5c27ad3dd",
//         "type": "word",
//         "sequence": 0,
//         "text": "Hello",
//         "geometry":
//         {
//             "x0": 0.0124,
//             "x1": 0.0571,
//             "y0": 0.0513,
//             "y1": 0.1548
//         }
//     },
//     {
//         "id": "2cf6122d-f46f-4b70-96f4-e70e9b03d113",
//         "type": "word",
//         "sequence": 1,
//         "text": "world!",
//         "geometry":
//         {
//             "x0": 0.0958,
//             "x1": 0.2545,
//             "y0": 0.0495,
//             "y1": 0.1627
//         }
//     }
// ]
// `

// console.log(getPageText(ocrJson, 0))