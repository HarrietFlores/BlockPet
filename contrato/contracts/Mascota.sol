// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Mascota {

    struct MascotaInfo {
        string nombre;
        string raza;
        string color;
        string comportamiento;
        string owner_name;
        string owner_phone;
    }

    MascotaInfo[] public mascotas;

    event MascotaAgregada(
        string nombre,
        string raza,
        string color,
        string comportamiento,
        string owner_name,
        string owner_phone
    );

    function addpet(
        string memory nombre,
        string memory raza,
        string memory color,
        string memory comportamiento,
        string memory owner_name,
        string memory owner_phone
    ) public {
        MascotaInfo memory nuevaMascota = MascotaInfo({
            nombre: nombre,
            raza: raza,
            color: color,
            comportamiento: comportamiento,
            owner_name: owner_name,
            owner_phone: owner_phone
        });

        mascotas.push(nuevaMascota);

        emit MascotaAgregada(nombre, raza, color, comportamiento, owner_name, owner_phone);
    }

    function obtenerMascota(uint256 index) public view returns (MascotaInfo memory) {
        require(index < mascotas.length, "Indice fuera de rango");
        return mascotas[index];
    }
}
