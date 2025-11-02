import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks:{
    authorized({auth,request:{nextUrl}}){
        // console.log('auth obj',auth);
        // console.log('nextUrl obj',nextUrl);
        // console.log('request',nextUrl);
        const isLoggedIn=!!auth?.user;
        const isOnDashboard =nextUrl.pathname.startsWith('/dashboard');
        if(isOnDashboard){
            if(isLoggedIn) return true;
            return false; // redirect to login page
        }else if(isLoggedIn){
            return Response.redirect(new URL('/dashboard',nextUrl))
        }

        return true;
    }
  },
  providers:[], // Add your authentication providers here
} satisfies NextAuthConfig;