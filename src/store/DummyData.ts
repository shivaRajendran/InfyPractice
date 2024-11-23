import { type User } from "../store/user-slice"

const dummyData: User[] = [
    {
      "firstName": "Alice",
      "isSubscribed": true,
      "dob": "25/04/1995",
      "contact": "+919876543210",
      "address": "123 Main Street, City 5",
      "gender": "Female"
    },
    {
      "firstName": "Bob",
      "isSubscribed": false,
      "dob": "17/11/1988",
      "contact": "+919876543211",
      "address": "456 Oak Street, City 2",
      "gender": "Male"
    },
    {
      "firstName": "Charlie",
      "isSubscribed": true,
      "dob": "03/07/1992",
      "contact": "+919876543212",
      "address": "789 Pine Street, City 8",
      "gender": "Male"
    },
    {
      "firstName": "David",
      "isSubscribed": false,
      "dob": "12/12/1990",
      "contact": "+919876543213",
      "address": "101 Elm Street, City 1",
      "gender": "Male"
    },
    {
      "firstName": "Eve",
      "isSubscribed": true,
      "dob": "29/02/1996",
      "contact": "+919876543214",
      "address": "321 Maple Street, City 7",
      "gender": "Female"
    }
  ]
  
  
export default dummyData;