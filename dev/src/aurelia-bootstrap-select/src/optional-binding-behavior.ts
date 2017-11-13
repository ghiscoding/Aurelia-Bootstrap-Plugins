export class OptionalBindingBehavior {
  bind(binding, scope, interceptor) {
    binding.originalupdateTarget = binding.updateTarget;
    binding.originalTargetProperty = binding.targetProperty;
    binding.updateTarget = val => {
      if (val === undefined || val === null || val === '') {
        binding.targetProperty = null;
      } else {
        binding.targetProperty = binding.originalTargetProperty;
      }
      binding.originalupdateTarget(val);
    };
  }

  unbind(binding, scope) {
    binding.updateTarget = binding.originalupdateTarget;
    binding.originalupdateTarget = null;
    binding.targetProperty = binding.originalTargetProperty;
    binding.originalTargetProperty = null;
  }
}