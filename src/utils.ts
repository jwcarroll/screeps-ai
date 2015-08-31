console.log('Executing utils');

import * as _ from 'lodash';

var creepExtensions = {
	getRole:function(){ return this.memory.role; },
	isHarvester:function(){ return this.getRole() === CreepRole.Harvester; },
	isBuilder:function(){ return this.getRole() === CreepRole.Builder; },
	isGuard:function(){ return this.getRole() === CreepRole.Guard; },
   isShooter:function(){ return this.getRole() === CreepRole.Shooter; },
   isMedic:function(){ return this.getRole() === CreepRole.Medic; }
};

interface ICreepDefinition {
   body:string[];
   role:CreepRole;
}

export const CreepTypes:{[index:number]:ICreepDefinition} = {};

export enum CreepRole {
   Harvester = 0,
   Builder = 1,
   Guard = 2,
   Shooter = 3,
   Medic = 4
}

export enum ActionResultCode {
	OK = 0,
	ERR_NOT_OWNER = -1,
	ERR_NO_PATH = -2,
	ERR_NAME_EXISTS = -3,
	ERR_BUSY = -4,
	ERR_NOT_FOUND = -5,
	ERR_NOT_ENOUGH_ENERGY = -6,
	ERR_INVALID_TARGET = -7,
	ERR_FULL = -8,
	ERR_NOT_IN_RANGE = -9,
	ERR_INVALID_ARGS = -10,
	ERR_TIRED = -11,
	ERR_NO_BODYPART = -12,
	ERR_RCL_NOT_ENOUGH = -14,
	ERR_GCL_NOT_ENOUGH = -15
}

export function creepDecorator(creepPrototype:Creep) {
	_.extend(creepPrototype, creepExtensions);
}

CreepTypes[CreepRole.Harvester] = {body:[MOVE, WORK, CARRY], role:CreepRole.Harvester};