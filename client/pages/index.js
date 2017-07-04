
    /**
     *
     *  DONT EDIT THIS FILE: IT WILL BE OVERWRITTEN BY WEBPACK NEXT TIME YOU SAVE ANYTHING!
     *
     */

    import universal from 'react-universal-component'
  
          export const create = universal(
            () => import(/* webpackChunkName: 'Create' */ './Create.js'),
            {
              resolve: () => require.resolveWeak('./Create.js'),
              chunkName: 'Create',
              minDelay: 0
            }
          )
        
          export const groups = universal(
            () => import(/* webpackChunkName: 'Groups' */ './Groups.js'),
            {
              resolve: () => require.resolveWeak('./Groups.js'),
              chunkName: 'Groups',
              minDelay: 0
            }
          )
        
          export const home = universal(
            () => import(/* webpackChunkName: 'Home' */ './Home.js'),
            {
              resolve: () => require.resolveWeak('./Home.js'),
              chunkName: 'Home',
              minDelay: 0
            }
          )
        
          export const notifications = universal(
            () => import(/* webpackChunkName: 'Notifications' */ './Notifications.js'),
            {
              resolve: () => require.resolveWeak('./Notifications.js'),
              chunkName: 'Notifications',
              minDelay: 0
            }
          )
        
          export const profile = universal(
            () => import(/* webpackChunkName: 'Profile' */ './Profile.js'),
            {
              resolve: () => require.resolveWeak('./Profile.js'),
              chunkName: 'Profile',
              minDelay: 0
            }
          )
        
    setTimeout(()=>{
      create.preload();groups.preload();home.preload();notifications.preload();profile.preload();
    },2000)
  