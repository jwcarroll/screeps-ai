console.log('Executing harvester');

export function harvester(creep:ICreep, spawnName:string) {

	if (creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find<ISource>(FIND_SOURCES);
		creep.moveTo(sources[0]);
		creep.harvest(sources[0]);
	}
	else {
		creep.moveTo(Game.spawns[spawnName]);
		creep.transferEnergy(Game.spawns[spawnName]);
	}
}