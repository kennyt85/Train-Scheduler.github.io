$(document).ready(function () {
    $('.modal').modal({
        show: false
    });
    let firebaseRef = firebase.database().ref();
    let aTrain;
    let editIndex;

    function renderTrainSchedule() {

        firebaseRef.child('aTrain').on('value', function (data) {
            aTrain = data.val();
            $('tbody').empty();
            aTrain.forEach(function (value, index) {
                let row = $(`
                <tr>
                    <td><span id="editBtn" data-train="${index}" class="glyphicon glyphicon-edit" aria-hidden="true">edit</span></td>
                    <td>${value.trainName}</td>
                    <td>${value.destination}</td>
                    <td>${value.frequency}</td>
                    <td>00:00pm</td>
                    <td>00:00</td>
                    <td><span id="removeBtn" data-train="${index}" class="glyphicon glyphicon-remove" aria-hidden>remove</span></td>
                </tr>
                `);
                $('tbody').append(row);
            });
        });


    }
    renderTrainSchedule();

    function saveToDatabase() {
        firebaseRef.child('aTrain').set(aTrain);
    }

    $(document).on('click', '#editBtn', function (event) {
        event.preventDefault();
        editIndex = $(this).attr('data-train');
        let train = aTrain[editIndex];
        $('.modal-title').html(train.trainName);
        $('.modal-body').html(`
         <form>
            <div class="form-group">
                <label for="trainName">Train Name</label>
                <input type="text" class="form-control" id="edit-trainName" placeHolder="edit train ${train.trainName}">
            </div>
            <div class="form-group">
                <label for="destination">Destination</label>
                <input type="text" class="form-control" id="edit-destination" placeHolder="${train.destination}">
            </div>
            <div class="form-group">
                <label for="firstTrainTime">First Train Time (HH:mm - military time)</label>
                <input type="text" class="form-control" id="edit-firstTrainTime" placeHolder="${train.firstTrainTime}">
            </div>
            <div class="form-group">
                <label for="frequency">Frequency</label>
                <input type="text" class="form-control" id="edit-frequency" placeHolder="${train.frequency}">
            </div>
        </form>
        `);
        $('.modal').modal('show');
        saveToDatabase();
    });

    $(document).on('click', '#saveChanges', function () {
        aTrain[editIndex].trainName = $('#edit-trainName').val();
        aTrain[editIndex].trainName = $('#edit-trainName').val();
        aTrain[editIndex].trainName = $('#edit-trainName').val();
        aTrain[editIndex].trainName = $('#edit-trainName').val();
        $('.modal').modal('hide');
        saveToDatabase();
    });

    $(document).on('click', '#removeBtn', function () {
        let index = $(this).attr('data-train');
        aTrain.splice(index, 1);
        saveToDatabase();
    });

    $('#submit').click(function (event) {
        event.preventDefault();
        let trainName = $('#trainName').val();
        let destination = $('#destination').val();
        let firstTrainTime = $('#firstTrainTime').val();
        let frequency = $('#frequency').val();

        aTrain.push({
            'trainName': trainName,
            'destination': destination,
            'firstTrainTime': firstTrainTime,
            'frequency': frequency
        });
        saveToDatabase();
    });
});