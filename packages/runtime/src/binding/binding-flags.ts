export enum BindingFlags {
  none                   = 0b000000000000000000_00000000_000_00,
  mustEvaluate           = 0b100000000000000000_00000000_000_00,

  mutation               = 0b000000000000000000_00000000_000_11,
  isCollectionMutation   = 0b000000000000000000_00000000_000_01,
  isInstanceMutation     = 0b000000000000000000_00000000_000_10,

  update                 = 0b000000000000000000_00000000_111_00,
  updateTargetObserver   = 0b000000000000000000_00000000_001_00,
  updateTargetInstance   = 0b000000000000000000_00000000_010_00,
  updateSourceExpression = 0b000000000000000000_00000000_100_00,

  from                   = 0b000000000000000000_11111111_000_00,
  fromFlushChanges       = 0b000000000000000000_00000001_000_00,
  fromStartTask          = 0b000000000000000000_00000010_000_00,
  fromStopTask           = 0b000000000000000000_00000100_000_00,
  fromBind               = 0b000000000000000000_00001000_000_00,
  fromUnbind             = 0b000000000000000000_00010000_000_00,
  fromDOMEvent           = 0b000000000000000000_00100000_000_00,
  fromObserverSetter     = 0b000000000000000000_01000000_000_00,
  fromBindableHandler    = 0b000000000000000000_10000000_000_00,
}