import prisma from ".."

export const getYourOrders = async ({ownerID})=>{

   try {
       const userBooks:any = await prisma.book.findMany({
        where:{
            ownerID
        },
        include:{
            orders:{
                
           
               include:{
                book:true,
            
                client:true,
               
               }
              
            }
        }
       })

    let orders = (userBooks.filter(e=>e.orders.length>0))
     


       console.log(orders);
       
       return orders     
       
   } catch (error) {
      console.log(error);
      throw error
      
   }



}


export const addOrder=async ({client,orders})=>{
    try {
        console.log(client);
        
        const c = await prisma.client.create({
            data:{
                ...client
            }
        })
        if (c) {
            
            orders.forEach(async order => {
                let o =  await prisma.order.create({
                    data:{
                      ...order,
                      status:false,
                      clientID:c.id
                    }
                 })
                 if(o){
                    
                    let book = await prisma.book.findUnique({
                        where:{
                            id:o.bookID
                        }
                    })

                    if (book) {
                        
                        await prisma.book.update({
                            where:{
                                id:o.bookID,
                            },
                            data:{
                                stock: book.stock - o.quantity
                            }
                        })

                    }
                 }
            });

            return "order created successfully !"


        }
    } catch (error) {
        console.log(error);
        
        throw error
    }

}