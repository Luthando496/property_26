import GoogleProvider from 'next-auth/providers/google';


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization:{
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                },
            }
        }),
    ],
    callbacks: {
        /// invoked sign in 
        async signIn({profile}) {
          
        },
        // modifies the session object
        async session({session}) {
          //1.Get user from the database
          //2. Attach user data to the session object
          //3. Return the updated session object
        }
    }
    
}