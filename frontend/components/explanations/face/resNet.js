
export default function FaceResNet() {
 
  return (
    <div className="mb-2 pt-2 pb-2 h-full w-full">
      <div class="relative text-gray-500 text-lg mb-3 flex-auto">
        You can find more about RestNet 
        <a className="ml-1 text-blue-500" target="_blank" href="https://en.wikipedia.org/wiki/Residual_neural_network#:~:text=From%20Wikipedia%2C%20the%20free%20encyclopedia%20Canonical%20form%20of,known%20from%20pyramidal%20cells%20in%20the%20cerebral%20cortex.">
          Here
        </a>
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        We used images with sick people and images with healthy people.
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        You can look down to see some images.
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        <img className="w-3/6 h-2/6" src="images/faceSick.JPG"/>
        <img className="w-3/6 h-2/6 mt-3" src="images/faceHealth.JPG"/>
      </div>
      <div class="font-bold relative text-gray-500 text-lg flex-auto">
        Cross-validation was used to train the model.
      </div>
      <div class="ml-3 flot-left text-left relative text-gray-500 text-lg flex-auto">
        The dataset was split in this way:
        <ul>
          <li>60% for training.</li>
          <li>20% for validation.</li>
          <li>20% for testing.</li>
        </ul>
        <div class="font-bold">We evaluated the model on the testing set using the next metrics:</div>
        <ul>
          <li>Accuracy.</li>
          <li>Precision.</li>
          <li>Recall.</li>
          <li>FMeasure.</li>
        </ul>
        We repeated the process and evaluated it each time. We obtained the following confidence intervals:
        <ul>
          <li class="font-bold">Accuracy - (0.706, 0.854).</li>
          <li class="font-bold">Precision - (0.818, 0.899).</li>
          <li class="font-bold">Recall - (0.706, 0.854).</li>
          <li class="font-bold">FMeasure - (0.716, 0.857).</li>
        </ul>
        <div className='h-10'/>
      </div>
    </div>
  );
}
