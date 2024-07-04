import RibbonMyCourses from './Ribbon.myCourses'
import RibbonC from './Ribbon'

type RibbonProps = {
  myCourses: typeof RibbonMyCourses
  base: typeof RibbonC
}

const Ribbon: RibbonProps = () => null 

Ribbon.myCourses = RibbonMyCourses
Ribbon.base = RibbonC

export default Ribbon
