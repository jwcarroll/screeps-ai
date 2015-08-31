console.log('Executing builder');

export function builder(creep:ICreep, spawnName:string){
	if(creep.carry.energy == 0) {
		creep.moveTo(Game.spawns[spawnName]);
		Game.spawns[spawnName].transferEnergy(creep);
	}
	else {
		let targets = creep.room.find<IConstructionSite>(FIND_CONSTRUCTION_SITES);
		if(targets.length) {
			creep.moveTo(targets[0]);
			creep.build(targets[0]);
		}
	}
}