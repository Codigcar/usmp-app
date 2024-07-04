import AsyncStorage from '@react-native-async-storage/async-storage'
import { MMKV } from 'react-native-mmkv'

import IStorage from './storage.interface'

class Storage implements IStorage {
  private storageFast: MMKV

  constructor() {
    const storage = new MMKV({id:'@usmp-app'})
    this.storageFast = storage
  }

  static instance: Storage

  static getInstance() {
    if (!this.instance) {
      this.instance = new Storage()
    }
    return this.instance
  }

  setFast(key: string, data: string, type: 'number' | 'bool' | 'string' = "string") {
    try {
      if(type==="string") {
        this.storageFast.set(key, JSON.stringify(data))
        return
      }
      
      this.storageFast.set(key, data)
    } catch (error) {
      console.log("🚀 ---------------------------------------------------------🚀")
      console.log("🚀 ~ file: index.ts:28 ~ Storage ~ setFast ~ error:", error)
      console.log("🚀 ---------------------------------------------------------🚀")
    }
  }

  getFast(key: string, type: 'number' | 'bool' | 'string' = "string") {
    try {
      if(type==="string") {
        const data = this.storageFast.getString(key)
        if(!data) return null
        return JSON.parse(data)
      }

      if(type === "bool")
         return this.storageFast.getBoolean(key)
        
      if(type==="number")
        return this.storageFast.getNumber(key)
          
    } catch (error) {
      console.log("🚀 ---------------------------------------------------------🚀")
      console.log("🚀 ~ file: index.ts:38 ~ Storage ~ getFast ~ error:", error)
      console.log("🚀 ---------------------------------------------------------🚀")
    }
  }

  async set(key: string, data: string) {
    try {
      await AsyncStorage.setItem(key, data)
    } catch (error) {
      console.log('🚀 -----------------------------------------------------🚀')
      console.log('🚀 ~ file: index.ts:25 ~ Storage ~ set ~ error:', error)
      console.log('🚀 -----------------------------------------------------🚀')
    }
  }

  async get(key: string) {
    try {
      return await AsyncStorage.getItem(key)
    } catch (error) {
      console.log('🚀 -----------------------------------------------------🚀')
      console.log('🚀 ~ file: index.ts:36 ~ Storage ~ get ~ error:', error)
      console.log('🚀 -----------------------------------------------------🚀')
    }
  }
}

export default Storage
