console.log('Executing spawn');

import {CreepRole, ActionResultCode, CreepTypes} from 'utils';

interface ISpawnBuilder {
   ():void;
   creepRatio(): ICreepRatios;
   creepRatio(role:CreepRole, ratio:number): ISpawnBuilder;
   creepRatio(role?:CreepRole, ratio?:number): any;
}

interface ICreepRatios {
   [index:number]:number;
}

export function spawn(spawnName:string): ISpawnBuilder{
   var ratios:ICreepRatios = {};
   var spawn:ISpawnBuilder = <any>function(){
      let curSpawn = Game.spawns[spawnName];
      
      if(!curSpawn) return;
      
      if(curSpawn.canCreateCreep(CreepTypes[CreepRole.Harvester].body) === ActionResultCode.OK){
         curSpawn.createCreep(CreepTypes[CreepRole.Harvester].body, undefined, {role:CreepRole.Harvester});
      }
   };
   
   spawn.creepRatio = function(role?:CreepRole, ratio?:number): any {
      if(!arguments.length) return ratios;
      
      ratios[role] = typeof ratio === 'undefined' ? 1 : ratio;
      
      return spawn;
   };
   
   return spawn;
}