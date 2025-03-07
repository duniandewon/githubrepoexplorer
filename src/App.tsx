import { ThemeProvider } from '@/components/theme-provider'

import { SearchForm } from '@/components/search-form'
import { UsersList } from '@/components/users-list'

import { useMainApp } from './hooks/use-main-app'

function App() {

  const { users, isLoading, fetchGithubUsers } = useMainApp()


  return (
    <ThemeProvider defaultTheme='dark'>
      <div className='p-4 space-y-4 max-w-[1024px] mx-auto'>
        <SearchForm onSubmit={({ search }) => {
          fetchGithubUsers(search)
        }} />
        {isLoading ? <p className="text-center">Loading...</p> : null}
        {!users.length && !isLoading ? <p className='text-center'>No data availabel</p> : null}
        {users.length ? <UsersList users={users} /> : null}
      </div>
    </ThemeProvider >
  )
}

export default App
