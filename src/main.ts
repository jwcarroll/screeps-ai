console.log('Executing main');

import * as units from 'creep-units';
import * as utils from 'utils';
import {spawn} from 'spawn';
import * as _ from 'lodash';

const Spawn1 = 'Spawn1';

utils.creepDecorator(Creep.prototype);

var sp1 = spawn(Spawn1)
   .creepRatio(utils.CreepRole.Harvester, 1);

sp1();

for (var name in Game.creeps) {
   var creep = Game.creeps[name];

   if (creep.isHarvester()) {
      units.harvester(creep, Spawn1);
   }

   if (creep.isBuilder()) {
      units.builder(creep, Spawn1);
   }

   if (creep.isGuard()) {
      units.guard(creep, Spawn1);
   }

   if (creep.isShooter()) {
      units.shooter(creep, Spawn1);
   }

   if (creep.isMedic()) {
      units.medic(creep, Spawn1);
   }
}

function debugWrite(obj) {
   console.log(JSON.stringify(obj));
}