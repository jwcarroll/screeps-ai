console.log('Executing guard');

export function guard(creep: ICreep, spawnName: string) {
	let targets = Game.spawns[spawnName].pos.findInRange<ICreep>(FIND_HOSTILE_CREEPS, 15);
	if (targets.length) {
		creep.moveTo(targets[0]);
		creep.attack(targets[0]);
	}
	else {
		creep.memory.patrolLeg = creep.memory.patrolLeg || 1;

		var currentFlag = Game.flags['Patrol' + creep.memory.patrolLeg];
    	    
		//debugWrite('Flag: Patrol' + creep.memory.patrolLeg || 1);
		//debugWrite(currentFlag);
    	    
		if (creep.pos.isEqualTo(currentFlag)) {
			creep.memory.patrolLeg += 1;
		}

		if (creep.memory.patrolLeg > 4) {
			creep.memory.patrolLeg = 1;
		}

		currentFlag = Game.flags['Patrol' + creep.memory.patrolLeg];

		creep.moveTo(currentFlag);
	}
}