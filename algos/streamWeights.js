import {logos} from ".//algoHelper.js/logos.js"

let weights = {'hbomax': .60, "amazon": .75, "hulu":.55, "disney":.70, 
"netflix": .8, "peacock": .65, "apple": .50, "paramount": .45}
let streamingServices = Object.keys(weights);
let udfWeight = .4
let weightedArr = [];
let unique = [];


const streamWeights = (streamArr) => {
    streamArr.map((serviceLink) => {
        streamingServices.map((serviceProvider) => {
            if(serviceLink.includes(serviceProvider) && unique.includes(serviceProvider) === false){
                let weight = weights[serviceProvider]
                weightedArr.push([serviceLink, weight, logos[serviceProvider], serviceProvider])
                unique.push(serviceProvider)
            }
        })
    })

    weightedArr.sort((a,b)=>{
        return b[1] - a[1]
    })

    return weightedArr
}

export {streamWeights}