import { createContext, useCallback, useContext, useState } from 'react'
import { IStudyPlan } from '../screens/Home/domain/dtos/listStudyPlan.response'
import StudentEntity from '../screens/Auth/domain/entities/student.entity'
import Storage from '../libraries-implementation/storage'

type Props = {
  children: any
}

interface Context {
  isAuthenticated: boolean | undefined
  signIn: (user: StudentEntity) => void
  signOut: () => void
  user: StudentEntity | undefined
}

const AuthContext = createContext<Context>({} as Context)

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const isToken = Boolean(Storage.getInstance().getFast('token'))
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isToken)
  const [user, setUser] = useState<StudentEntity>()

  const signIn = (user: StudentEntity) => {
    setIsAuthenticated(true)
    setUser(user)
    Storage.getInstance().setFast('token', user.accessToken)
  }

  const signOut = useCallback(() => {
    setIsAuthenticated(false)
    Storage.getInstance().setFast('token','')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): Context => useContext(AuthContext)
