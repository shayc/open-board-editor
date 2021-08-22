import {
  DndContext,
  useSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
  AutoScrollActivator,
} from '@dnd-kit/core';

function DndProvider(props) {
  const { children, ...other } = props;

  const mouseConstraint = {
    distance: 5,
  };

  const touchConstraint = {
    delay: 250,
    tolerance: 5,
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: mouseConstraint,
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: touchConstraint,
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext
      sensors={sensors}
      autoScroll={{
        activator: AutoScrollActivator.Pointer,
        acceleration: 10,
        interval: 5,
      }}
      {...other}
    >
      {children}
    </DndContext>
  );
}

export default DndProvider;
