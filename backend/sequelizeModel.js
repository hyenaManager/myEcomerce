import {Sequelize,DataTypes} from "sequelize";

const sequelize = new Sequelize('messageData','root','@20002006kee@',{
    dialect:'mysql'
});
const UserInbox = sequelize.define('userinbox',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    user_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    },
    watched:{
        type:DataTypes.BOOLEAN,
        // allowNull:false,
    }
    
}, {
    freezeTableName: true
  })


async function addMessage(){
    await sequelize.sync({alter:true});
    const message = UserInbox.build({
        user_id:3,
        user_name:'blue',
        message:"this is message",
        watched:true
    })
    console.log("success")
    return message.save()
}
addMessage().then(()=>{
    console.log('message saved successfully')
    
}).catch((error)=>{
     console.log(error)
     
})
console.log("other tasks")
