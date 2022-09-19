import { stay } from "../store/modules/stay.js"
import { storageService } from "./storage-service.js"
import { httpService } from "./http.service.js"
// const stays = require('../../data/stay.json')
export const stayService = {
  query,
  getById,
  getRandomArr,
  updateStay
}

const DB_KEY = "stayDB"
_createStays()

async function query(filterBy = null) {
  // var stays = await storageService.query(DB_KEY)
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  var stays =  await httpService.get(`stay`)
  console.log(stays);
  if (!filterBy) return stays
  var filteredStays = stays

  //filter by amenities
  if (filterBy.amenities && filterBy.amenities.length) {
    filteredStays = filteredStays.filter((stay) => {
      return filterBy.amenities.every((amn) => {
        return stay.amenities.includes(amn)
      })
    })
  }
  //filter by bathroom
  if (filterBy.bathrooms && filterBy.bathrooms.length) {
    filteredStays = filteredStays.filter(
      (stay) => stay.bathrooms === filterBy.bathrooms[0]
    )
  }

  //filter by bedrooms
  if (filterBy.bedrooms && filterBy.bedrooms.length) {
    filteredStays = filteredStays.filter(
      (stay) => stay.bedrooms === filterBy.bedrooms[0]
    )
  }

  //filter by beds
  if (filterBy.beds && filterBy.beds.length) {
    filteredStays = filteredStays.filter(
      (stay) => stay.beds === filterBy.beds[0] //its an arr bc the element-plus cmp we used is v-modeled to an array and we customized it to limit it to one element like the real airbnb
    )
  }

  //filter by property type
  if (filterBy.propertyType && filterBy.propertyType.length) {
    filteredStays = filteredStays.filter((stay) => {
      return filterBy.propertyType.includes(stay.propertyType)
    })
  }

  //filter by room type
  if (filterBy.roomType && filterBy.roomType.length) {
    filteredStays = filteredStays.filter((stay) => {
      return filterBy.roomType.find((rType) => {
        return stay.roomType.includes(rType)
      })
    })
  }
  //filter by superHost
  if (filterBy.superHost)
    filteredStays = filteredStays.filter((stay) => stay.host.isSuperhost)

  //filter by price
  if (filterBy.priceRange && filterBy.priceRange.length === 2) {
    filteredStays = filteredStays.filter(
      (stay) =>
        stay.price >= filterBy.priceRange[0] &&
        stay.price <= filterBy.priceRange[1]
    )
  }

  //filter by label category
  if (filterBy.category && filterBy.category !== 'All') {
    const categoryReg = new RegExp(filterBy.category, 'i');
    filteredStays = filteredStays.filter(
      (stay) => 
        categoryReg.test(stay.summary) ||
        categoryReg.test(stay.interaction) ||
        categoryReg.test(stay.name)
    )
  }

  //filter by destination
  if(filterBy.destination){
    const destReg = new RegExp(filterBy.destination, 'i')
    filteredStays = filteredStays.filter((stay)=>{
        return destReg.test(stay.address.street) ||
               destReg.test(stay.address.country) ||
               destReg.test(stay.address.city) ||
               destReg.test(stay.address.countryCode)
    })
  }

  //filter by capacity
  if(filterBy.guests){
    var capacity = Object.values(filterBy.guests).reduce((acc,amount) => acc + amount, 0)
    filteredStays = filteredStays.filter((stay)=> stay.capacity >= capacity)
    
  }

  console.log("filtering with", filterBy)
  return filteredStays
}

async function getById(stayId) {
  try {
    // var stay = await storageService.get(DB_KEY, stayId)
    var stay =  await httpService.get(`stay/${stayId}`)
    return stay
  } catch (error) {
    console.log(error)
  }
}

async function updateStay(stay){
  var newStay =  await httpService.put(`stay/${stay._id}`)
  return newStay
}

async function _createStays() {
  var stays = JSON.parse(localStorage.getItem(DB_KEY))
  if (!stays || !stays.length) {
    stays = await (await fetch("../../data/1.json")).json()
    // stays = stays.splice(0, 20)
    // console.log(stays)
    localStorage.setItem(DB_KEY, JSON.stringify(stays))
  }
}

function getRandomArr() {
  var min = Math.ceil(1)
  var max = Math.floor(26)
  var arr = []
  var count = 0
  var randNum = Math.floor(Math.random() * (max - min + 1)) + min
  while(count <= 11){
    if(!arr.includes(randNum)){
        arr.push(randNum)
        count++
        randNum = Math.floor(Math.random() * (max - min + 1)) + min
    }
    else{
        randNum = Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
  return arr
}
