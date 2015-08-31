interface ICreep {
	getRole:() => string;
	isHarvester:() => boolean;
	isBuilder:() => boolean;
	isGuard:() => boolean;
   isShooter:() => boolean;
   isMedic:() => boolean;
}