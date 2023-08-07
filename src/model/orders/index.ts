import prisma from ".."
import { AppError } from "../../exception"

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

    let orders:any = (userBooks.filter(e=>e.orders.length>0)).map(e=>e.orders)
     let r:any = []
     for (let i = 0; i < orders.length; i++) {
       r.push(orders[i][0])
        
     }
   
       console.log(r);
       
       return r     
       
   } catch (error) {
      console.log(error);
      throw error
      
   }



}



export const addOrder=async ({client,orders})=>{
    try {
        
        const c = await prisma.client.create({
            data:{
                ...client
            }
        })
        if (c) {
            console.log(c,orders);

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


export const  updateStatusOrder= async ({id,status,ownerID})=> {
    try {
        const order = await prisma.order.findFirstOrThrow({where:{id:parseInt(id)},include:{book:true}})
        if(order){
            if(order.book.ownerID != ownerID)  throw new AppError(401,"you are unauthorized to do this action")

            await prisma.order.update({
                where:{id:parseInt(id)},
                data:{
                    status
                }
            })
            return "the status of your order was updated"
        }
    } catch (err) {
        console.log(err);
        throw err
        
    }
}