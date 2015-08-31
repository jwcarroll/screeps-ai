console.log('Executing shooter');

export function shooter(creep: ICreep, spawnName: string) {
	let targets = Game.spawns[spawnName].pos.findInRange<ICreep>(FIND_HOSTILE_CREEPS, 15);
	if (targets.length) {
		if (!creep.pos.inRangeTo(targets[0], 3)) {
			creep.moveTo(targets[0]);
		}

		creep.rangedAttack(targets[0]);
	}
}