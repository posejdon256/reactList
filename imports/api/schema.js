export default typeDefs = [`
type Person{
    _id: String,
    first_name: String,
    last_name: String,
    email: String,
    gender: Int,
    ip_address: String,
    selected: Boolean,
    edited: Boolean,
    userId: String
}
type Query {
    people(_id: Int): [Person],
  }
`];