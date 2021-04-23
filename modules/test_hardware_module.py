import pytest
import pytest_check as check
from flask import jsonify

from . import hardware_module

class TestHardwareModule:
    def test_second(self):
        check.equal(hardware_module.second(), "hardware_module")

