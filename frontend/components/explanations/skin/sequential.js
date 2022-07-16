
export default function SkinSequential() {
 
  return (
    <div className="mb-2 pt-2 pb-2 h-full w-full">
      <div class="relative text-gray-500 text-lg mb-3 flex-auto">
        You can find more about Sequential 
        <a className="ml-1 text-blue-500" target="_blank" href="https://keras.io/guides/sequential_model/">
          Here
        </a>
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        The classifier was trained using a database of photos with skin cancer.
        After testing with more than 150 cases it was seen that the accuracy was greater than 50%
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        You can look down to see a part of the cases from that databases and a part 
        from the process of learning of the classifier
      </div>
      <div class="relative text-gray-500 text-lg flex-auto">
        <img src="images/skin.JPG"/>
        <img src="images/skinTrain.JPG"/>
        <img src="images/skinAcc.JPG"/>
        <img src="images/skinLoss.JPG"/>
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
          <li class="font-bold">Accuracy - (0.339, 0.567).</li>
          <li class="font-bold">Precision - (0.115, 0.341).</li>
          <li class="font-bold">Recall - (0.339, 0.567).</li>
          <li class="font-bold">FMeasure - (0.173, 0.421).</li>
        </ul>
        <div className='h-10'/>
      </div>
    </div>
  );
}
