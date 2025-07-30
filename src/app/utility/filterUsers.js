export const filterUsers = (users, searchTerm) => {
  const query = searchTerm && searchTerm.toLowerCase() 
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  )
}