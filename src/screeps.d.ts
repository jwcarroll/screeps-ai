declare var Game: IGame;

interface IGame {
   cpuLimit: number;
   creeps: { [screepName: string]: ICreep };
   flags: { [flagName: string]: IFlag };
   map: IMap;
   rooms: { [roomName: string]: IRoom };
   spawns: { [spawnName: string]: ISpawn };
   structures: { [structureName: string]: IStructure };
   time: number;

   getObjectById(id: string): any;
   getUsedCpu(): number;
   notify(message: string, groupInterval?: number): void;
}

declare var Creep: ICreep;

interface ICreep extends IHasRoomPosition {
   body: { type: string, hits: number }[];
   carry: { energy: number };
   carryCapacity: number;
   fatigue: number;
   hits: number;
   hitsMax: number;
   id: string;
   memory: any | ICreepMemory;
   my: boolean;
   name: string;
   owner: IOwner;
   room: IRoom;
   spawning: boolean;
   ticksToLive: number;

   attack(target: ICreep|ISpawn|IStructure): ActionResultCode;
   build(target: IConstructionSite): ActionResultCode;
   cancelOrder(methodName: string): ActionResultCode;
   claimController(target: IStructure): ActionResultCode;
   dropEnergy(amount?: number): ActionResultCode;
   getActiveBodyparts(type: string): number;
   harvest(target: ISource): ActionResultCode;
   heal(target: ICreep): ActionResultCode;
   move(direction: number): ActionResultCode;
   moveByPath(path: IPathStep[]): ActionResultCode;
   moveTo(x: number, y: number, opts?: MoveToOptions);
   moveTo(target: IRoomPosition|IHasRoomPosition, opts?: MoveToOptions);
   notifyWhenAttacked(enabled: boolean): ActionResultCode;
   pickup(target: IEnergy): ActionResultCode;
   rangedAttack(target: ICreep|ISpawn|IStructure): ActionResultCode;
   rangedHeal(target: ICreep): ActionResultCode;
   rangedMassAttack(): ActionResultCode;
   repair(target: ISpawn|IStructure): ActionResultCode;
   say(message: string): ActionResultCode;
   suicide(): ActionResultCode;
   transferEnergy(target: ICreep|ISpawn|IStructure, amount?: number): ActionResultCode;
   unclaimController(target: IStructure): ActionResultCode;
   upgradeController(target: IStructure): ActionResultCode;
}

interface ICreepMemory { }

declare var RoomPosition: IRoomPosition;

interface IRoomPosition {
   constructor(x: number, y: number, roomName: string);
   roomName: string;
   x: number;
   y: number;
   createConstructionSite(structureType: string): ActionResultCode;
   createFlag(name?: string, color?: string): ActionResultCode;
   findClosest(type: number, opts?: IPathfindingOptions|IFilterOption|IPathfindingAlgorithmOption): any;
   findClosest(objects: any[], opts?: IPathfindingOptions|IFilterOption|IPathfindingAlgorithmOption): any;
   findClosestByRange<T>(type: number, opts?: IFilterOption): T;
   findClosestByRange(objects: any[], opts?: IFilterOption): any;
   findInRange<T>(type: number, range: number, opts?: IFilterOption): T[];
   findInRange(objects, range: number, opts?: IFilterOption): any[];
   findPathTo(x: number, y: number, opts?: IPathfindingOptions): IPathStep[];
   findPathTo(target: IRoomPosition|IHasRoomPosition, opts?: IPathfindingOptions): IPathStep[];
   getDirectionTo(x: number, y: number): number;
   getDirectionTo(target: IRoomPosition|IHasRoomPosition): number;
   getRangeTo(x: number, y: number): number;
   getRangeTo(target: IRoomPosition|IHasRoomPosition): number;
   inRangeTo(toPos: IRoomPosition|IHasRoomPosition, range: number): boolean;
   isEqualTo(x: number, y: number): boolean;
   isEqualTo(target: IRoomPosition|IHasRoomPosition): boolean;
   isNearTo(x: number, y: number): boolean;
   isNearTo(target: IRoomPosition|IHasRoomPosition): boolean;
   look(): { type: string }[];
   lookFor(type: string): any[];
   lookFor(type: 'constructionSite'): IConstructionSite[];
   lookFor(type: 'creep'): ICreep[];
   lookFor(type: 'energy'): IEnergy[];
   lookFor(type: 'exit'): IExit[];
   lookFor(type: 'flag'): IFlag[];
   lookFor(type: 'source'): ISource[];
   lookFor(type: 'structure'): IStructure[];
   lookFor(type: 'terrain'): ITerrain[];
}

interface IHasRoomPosition {
   pos: IRoomPosition;
}

interface IFlag extends IHasRoomPosition {
   id: string;
   color: string;
   memory: any;
   name: string;
   room: IRoom;
   roomName: string;
   remove(): ActionResultCode;
   setColor(color: string): ActionResultCode;
   setPosition(x: number, y: number): ActionResultCode;
   setPosition(pos: IRoomPosition|IHasRoomPosition): ActionResultCode;
}

interface IEnergy extends IHasRoomPosition {
   energy: number;
   id: string;
   room: IRoom;
}

declare var Spawn: ISpawn;

interface ISpawn extends IHasRoomPosition {
   energy: number;
   energyCapacity: number;
   hits: number;
   hitsMax: number;
   id: string;
   memory: any;
   my: boolean;
   name: string;
   owner: IOwner;
   room: IRoom;
   structureType: string;
   spawning: {
      name: string;
      needTime: number;
      remainingTime: number;
   };
   canCreateCreep(body: string[], name?: string): ActionResultCode;
   createCreep(body: string[], name?: string, memory?: any): ActionResultCode;
   destroy(): ActionResultCode;
   notifyWhenAttacked(enabled: boolean): ActionResultCode;
   transferEnergy(target: ICreep, amount?: number);
}

interface IStructure extends IHasRoomPosition {
   hits: number;
   hitsMax: number;
   id: string;
   my: boolean;
   owner: IOwner;
   room: IRoom;
   structureType: string;
   destroy(): ActionResultCode;
   notifyWhenAttacked(enabled: boolean): ActionResultCode;
}

interface IExtension extends IStructure {
   energy: number;
   energyCapacity: number;
   transferEnergy(target: ICreep, amount?: number): ActionResultCode;
}

interface ILink extends IStructure {
   cooldown: number;
   energy: number;
   energyCapacity: number;
   transferEnergy(target: ICreep|ILink, amount?: number): ActionResultCode;
}

interface IKeeperLair extends IStructure {
   ticksToSpawn: number;
}

interface IController extends IStructure {
   level: number;
   progress: number;
   progressTotal: number;
   ticksToDowngrade: number;
}

interface IRampart extends IStructure {
   ticksToDecay: number;
}

interface IRoad extends IStructure {
   ticksToDecay: number;
}

interface IWall extends IStructure {
   ticksToLive: number;
}

interface IStorage extends IStructure {
   store: { energy: number };
   storeCapacity: number;
   transferEnergy(target: ICreep, amount?: number): ActionResultCode;
}

interface ISource extends IHasRoomPosition {
   energy: number;
   energyCapacity: number;
   id: string;
   room: IRoom;
   ticksToRegeneration: number;
}

interface IOwner {
   username: string
}

interface IConstructionSite extends IHasRoomPosition {
   id: string;
   my: boolean;
   owner: IOwner;
   progress: number;
   progressTotal: number;
   room: IRoom;
   structureType: string;
   remove(): ActionResultCode;
}

interface IMap {
   describeExits(roomName: string): { [index: number]: string };
   findExit(fromRoom: string|IRoom, toRoom: string|IRoom): number;
   findRoute(fromRoom, toRoom): { exit: number, room: string }[]|ActionResultCode;
   isRoomProtected(roomName: string): boolean;
}

declare var Room: IRoom;

interface IRoom {
   controller?: IController;
   energyAvailable: number;
   energyCapacityAvailable: number;
   memory: any;
   mode: string;
   name: string;
   storage?: IStorage;
   survivalInfo?: { score: number, timeToWave: number, wave: number };
   createConstructionSite(x: number, y: number, structureType: string): ActionResultCode;
   createConstructionSite(pos: IRoomPosition|IHasRoomPosition, structureType: string): ActionResultCode;
   createFlag(x: number, y: number, name?: string, color?: string): ActionResultCode;
   createFlag(pos: IRoomPosition|IHasRoomPosition, name?: string, color?: string): ActionResultCode;
   find<T>(type: number, opts?: IFilterOption): T[];
   findExitTo(room: string|IRoom): number;
   findPath(fromPos: IRoomPosition, toPos: IRoomPosition, opts?: IPathfindingOptions): IPathStep[];
   getPositionAt(x: number, y: number): IRoomPosition;
   lookAt(x: number, y: number): { type: string }[];
   lookAt(target: IRoomPosition|IHasRoomPosition): { type: string }[];
   lookAtArea(top: number, left: number, bottom: number, right: number): IAreaFindResults<{ type: string }>;
   lookForAt(type: string, x: number, y: number): any[];
   lookForAt(type: 'constructionSite', x: number, y: number): IConstructionSite[];
   lookForAt(type: 'creep', x: number, y: number): ICreep[];
   lookForAt(type: 'energy', x: number, y: number): IEnergy[];
   lookForAt(type: 'exit', x: number, y: number): IExit[];
   lookForAt(type: 'flag', x: number, y: number): IFlag[];
   lookForAt(type: 'source', x: number, y: number): ISource[];
   lookForAt(type: 'structure', x: number, y: number): IStructure[];
   lookForAt(type: 'terrain', x: number, y: number): ITerrain[];
   lookForAt(type: string, target: IRoomPosition|IHasRoomPosition): any[];
   lookForAt(type: 'constructionSite', target: IRoomPosition|IHasRoomPosition): IConstructionSite[];
   lookForAt(type: 'creep', target: IRoomPosition|IHasRoomPosition): ICreep[];
   lookForAt(type: 'energy', target: IRoomPosition|IHasRoomPosition): IEnergy[];
   lookForAt(type: 'exit', target: IRoomPosition|IHasRoomPosition): IExit[];
   lookForAt(type: 'flag', target: IRoomPosition|IHasRoomPosition): IFlag[];
   lookForAt(type: 'source', target: IRoomPosition|IHasRoomPosition): ISource[];
   lookForAt(type: 'structure', target: IRoomPosition|IHasRoomPosition): IStructure[];
   lookForAt(type: 'terrain', target: IRoomPosition|IHasRoomPosition): ITerrain[];
   lookForAtArea(type: string, top: number, left: number, bottom: number, right: number): IAreaFindResults<any>;
   lookForAtArea(type: 'constructionSite', top: number, left: number, bottom: number, right: number): IAreaFindResults<IConstructionSite>;
   lookForAtArea(type: 'creep', top: number, left: number, bottom: number, right: number): IAreaFindResults<ICreep>;
   lookForAtArea(type: 'energy', top: number, left: number, bottom: number, right: number): IAreaFindResults<IEnergy>;
   lookForAtArea(type: 'exit', top: number, left: number, bottom: number, right: number): IAreaFindResults<IExit>;
   lookForAtArea(type: 'flag', top: number, left: number, bottom: number, right: number): IAreaFindResults<IFlag>;
   lookForAtArea(type: 'source', top: number, left: number, bottom: number, right: number): IAreaFindResults<ISource>;
   lookForAtArea(type: 'structure', top: number, left: number, bottom: number, right: number): IAreaFindResults<IStructure>;
   lookForAtArea(type: 'terrain', top: number, left: number, bottom: number, right: number): IAreaFindResults<ITerrain>;
}

interface IAreaFindResults<T> {
   [x: number]: {
      [y: number]: T[]
   }
}

interface IExit extends IHasRoomPosition {
   exit: number;
   id: string;
   room: IRoom;
}

interface ITerrain { }


interface IPathStep {
   x: number;
   y: number;
   dx: number;
   dy: number;
   direction: number;
}

interface IPathfindingOptions {
   ignoreCreeps?: boolean;
   ignoreDestructibleStructures?: boolean;
   ignore?: any[];
   avoid?: any[];
   maxOps?: number;
   heuristicWeight?: number;
}

interface IReusePathOptions {
   reusePath?: number;
   noPathFinding?: boolean;
}

interface IFilterOption {
   filter: Object|Function|string;
}

interface IPathfindingAlgorithmOption {
   algorithm: string;
}

declare type MoveToOptions = IPathfindingOptions|IReusePathOptions;

//Action Result Codes
//
// declare enum ActionResultCode {
// 	OK = 0,
// 	ERR_NOT_OWNER = -1,
// 	ERR_NO_PATH = -2,
// 	ERR_NAME_EXISTS = -3,
// 	ERR_BUSY = -4,
// 	ERR_NOT_FOUND = -5,
// 	ERR_NOT_ENOUGH_ENERGY = -6,
// 	ERR_INVALID_TARGET = -7,
// 	ERR_FULL = -8,
// 	ERR_NOT_IN_RANGE = -9,
// 	ERR_INVALID_ARGS = -10,
// 	ERR_TIRED = -11,
// 	ERR_NO_BODYPART = -12,
// 	ERR_RCL_NOT_ENOUGH = -14,
// 	ERR_GCL_NOT_ENOUGH = -15
// }
//
declare type ActionResultCode = number;

declare var Memory;

declare const OK: number;
declare const ERR_NOT_OWNER: number;
declare const ERR_NO_PATH: number;
declare const ERR_NAME_EXISTS: number;
declare const ERR_BUSY: number;
declare const ERR_NOT_FOUND: number;
declare const ERR_NOT_ENOUGH_ENERGY: number;
declare const ERR_INVALID_TARGET: number;
declare const ERR_FULL: number;
declare const ERR_NOT_IN_RANGE: number;
declare const ERR_INVALID_ARGS: number;
declare const ERR_TIRED: number;
declare const ERR_NO_BODYPART: number;
declare const ERR_RCL_NOT_ENOUGH: number;
declare const ERR_GCL_NOT_ENOUGH: number;

//Direction Constants
declare const BOTTOM;
declare const BOTTOM_LEFT;
declare const BOTTOM_RIGHT;
declare const LEFT;
declare const RIGHT;
declare const TOP;
declare const TOP_LEFT;
declare const TOP_RIGHT;

//Search Type Constants
declare const FIND_CREEPS: number;
declare const FIND_MY_CREEPS: number;
declare const FIND_HOSTILE_CREEPS: number;
declare const FIND_MY_SPAWNS: number;
declare const FIND_HOSTILE_SPAWNS: number;
declare const FIND_SOURCES: number;
declare const FIND_SOURCES_ACTIVE: number;
declare const FIND_DROPPED_ENERGY: number;
declare const FIND_STRUCTURES: number;
declare const FIND_MY_STRUCTURES: number;
declare const FIND_HOSTILE_STRUCTURES: number;
declare const FIND_FLAGS: number;
declare const FIND_CONSTRUCTION_SITES: number;
declare const FIND_EXIT_TOP: number;
declare const FIND_EXIT_RIGHT: number;
declare const FIND_EXIT_BOTTOM: number;
declare const FIND_EXIT_LEFT: number;
declare const FIND_EXIT: number;

//Structure Type Constants
declare const STRUCTURE_EXTENSION: string;
declare const STRUCTURE_RAMPART: string;
declare const STRUCTURE_ROAD: string;
declare const STRUCTURE_SPAWN: string;
declare const STRUCTURE_WALL: string;
declare const STRUCTURE_KEEPER_LAIR: string;
declare const STRUCTURE_PORTAL: string;
declare const STRUCTURE_CONTROLLER: string;
declare const STRUCTURE_LINK: string;
declare const STRUCTURE_STORAGE: string;

//Flag Color Constants
declare const COLOR_WHITE: string;
declare const COLOR_GREY: string;
declare const COLOR_RED: string;
declare const COLOR_PURPLE: string;
declare const COLOR_BLUE: string;
declare const COLOR_CYAN: string;
declare const COLOR_GREEN: string;
declare const COLOR_YELLOW: string;
declare const COLOR_ORANGE: string;
declare const COLOR_BROWN: string;

//Room Mode Constants
declare const MODE_SIMULATION: string;
declare const MODE_SURVIVAL: string;
declare const MODE_WORLD: string;
declare const MODE_ARENA: string;

//Creep Body Type Constants
declare const WORK: string;
declare const MOVE: string;
declare const CARRY: string;
declare const ATTACK: string;
declare const RANGED_ATTACK: string;
declare const HEAL: string;
declare const TOUGH: string;