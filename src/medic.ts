console.log('Executing medic');

export function medic(creep:ICreep, spawnName:string) {
   let hurtCreeps = creep.room.find<ICreep>(FIND_MY_CREEPS, {filter:function(c){
      return c.hits < c.hitsMax;
   }});
      
   if(hurtCreeps.length){
      creep.moveTo(hurtCreeps[0]);
      creep.heal(hurtCreeps[0]);
   }
   else{
      creep.moveTo(Game.spawns[spawnName]);
   }
}